import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config'
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 3000;
const prisma = new PrismaClient();

app.use(express.json());

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Missing Authorization Header"})
    }
    
    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Invalid authorization format"})
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;

    if(!secret) {
        return res.status(500).json({ error: "JWT_SECRET not defined"});
    }

    try {
        const decodedToken = jwt.verify(token, secret) as { userId: number};
        (req as any).userId = decodedToken.userId;
        next();
    } catch {
        return res.status(401).json({ error: "Invalid or expired token"});
    }
}

// Simple test route
app.get('/', (_req: Request, res: Response) => {
  res.send('Job Application Tracker API is running!');
});

app.post('/auth/register', async(req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ error: "Email and password are required"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: { email, password: hashedPassword }
        });

        res.status(201).json({ id: newUser.id, email: newUser.email })

        // temp logging of new user in console
        // TODO remove this users log
        const users = await prisma.user.findMany();
        console.log('Users in DB:', users);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error'});
    }
});

app.post('/auth/login', async(req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required"})
        }

        const user = await prisma.user.findUniqueOrThrow({
            where: { email }
        });

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid email or password"});
        }

        const secret = process.env.JWT_SECRET;
        if(!secret) {
            return res.status(500).json({error: "JWT_SECRET not defined"})
        }

        const token = jwt.sign(
            { userId: user.id },
            secret,
            { expiresIn: "1h" }
        )

        res.status(200).json({ 
            token,
            user: {id: user.id, email: user.email}
        });

    } catch (err) {
        console.log(err);
        res.status(401).json({ error: 'Invalid email or password' });
    }
})

app.post("/applications", authMiddleware, async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const { companyName, roleTitle, status, appliedDate } = req.body;

        if (!companyName || !roleTitle) {
            return res.status(400).json({ error: "companyName and roleTitle are required!"})
        }

        const application = await prisma.jobApplication.create({
            data: {
                userId,
                companyName,
                roleTitle,
                status,
                appliedDate
            }
        });

        res.status(201).json(application)
    } catch(err) {
        console.error(err)
        return res.status(500).json({ error: "Server Error"})
    }
})

app.get("/applications", authMiddleware, async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const applicationList = await prisma.jobApplication.findMany({
            where: { userId },
            orderBy: { appliedDate: "desc" }
        });

        return res.status(200).json(applicationList)
    } catch(err) {
        console.error(err)
        return res.status(500).json({ error: "Server Error"})
    }
})

app.get("/applications/:id", authMiddleware, async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const applicationId = Number(req.params.id);

        if (Number.isNaN(applicationId)) {
            return res.status(400).json({ error: "Invalid application id"})
        }

        const application = await prisma.jobApplication.findFirst({
            where: {
                id: applicationId,
                userId
            },
        });

        if (!application) {
            return res.status(404).json({ error: "Application not found"});
        }

        return res.status(200).json(application)
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server Error"});
    }
})

app.patch("/applications/:id", authMiddleware, async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const applicationId = Number(req.params.id);

        if (Number.isNaN(applicationId)) {
            return res.status(400).json({ error: "Invalid application id"})
        } 

        const { status, companyName, roleTitle, appliedDate } = req.body;

        if (!status && !companyName && !roleTitle && !appliedDate) {
            return res.status(400).json({ error: "No fields provided to update"})
        }

        const updatedApplication = await prisma.jobApplication.updateMany({
            where: {
                id: applicationId,
                userId
            },
            data: {
                status,
                companyName,
                roleTitle,
                appliedDate
            },
        });

        if (updatedApplication.count === 0) {
            return res.status(404).json({ error: "Application not found"})
        }

        const application = await prisma.jobApplication.findFirst({
            where: {
                id: applicationId,
                userId
            },
        });

        return res.status(200).json(application)
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server Error"});
    }
})

app.delete("/applications/:id", authMiddleware, async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const applicationId = Number(req.params.id);

        if (Number.isNaN(applicationId)) {
            return res.status(400).json({ error: "Invalid application id"});
        }

        const deletedApplication = await prisma.jobApplication.deleteMany({
            where: {
                id: applicationId,
                userId
            }
        });

        if (deletedApplication.count === 0) {
            return res.status(404).json({ error: "Application not found"});
        }

        return res.status(204).send()
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server Error"});
    }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

(async () => {
  const users = await prisma.user.findMany();
  console.log('Users in DB:', users);
})();