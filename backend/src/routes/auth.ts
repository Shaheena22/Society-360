import { Router, Request, Response } from 'express';
import { db, User } from '../models/store';

const router = Router();

// POST Register
router.post('/register', (req: Request, res: Response) => {
  const { name, phone, email, preferredLanguage, role, bloodGroup } = req.body;

  if (!phone && !email) {
    return res.status(400).json({ success: false, message: 'Phone or email required' });
  }

  const existing = Array.from(db.users.values()).find(u => u.phone === phone || u.email === email);
  if (existing) {
    return res.json({ success: true, user: existing, message: 'User authenticated successfully' });
  }

  const uid = `usr-${Date.now()}`;
  const newUser: User = {
    uid,
    name: name || 'Citizen User',
    phone: phone || '',
    email: email || '',
    preferredLanguage: preferredLanguage || 'English',
    role: role || 'citizen',
    points: 20, // Registration welcome reward
    badge: 'Bronze',
    trustedContacts: [],
    donorProfile: bloodGroup ? {
      bloodGroup,
      available: true,
      location: 'Kalaburagi',
      contactPhone: phone || ''
    } : undefined,
    createdAt: new Date().toISOString()
  };

  db.users.set(uid, newUser);
  db.addAuditLog(uid, role || 'citizen', 'REGISTER_USER', uid, `User ${name} registered.`);

  res.status(201).json({ success: true, user: newUser });
});

// POST Login
router.post('/login', (req: Request, res: Response) => {
  const { identifier, password } = req.body;

  // Search user by email, phone, or uid
  const user = Array.from(db.users.values()).find(
    u => u.email === identifier || u.phone === identifier || u.uid === identifier
  );

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials or user not found' });
  }

  res.json({ success: true, user });
});

// GET Current User Profile
router.get('/profile/:uid', (req: Request, res: Response) => {
  const user = db.users.get(req.params.uid);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  res.json({ success: true, user });
});

// PATCH Update Profile
router.patch('/profile/:uid', (req: Request, res: Response) => {
  const user = db.users.get(req.params.uid);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  const { name, preferredLanguage, trustedContacts, donorProfile } = req.body;

  if (name) user.name = name;
  if (preferredLanguage) user.preferredLanguage = preferredLanguage;
  if (trustedContacts) user.trustedContacts = trustedContacts;
  if (donorProfile) user.donorProfile = donorProfile;

  res.json({ success: true, user });
});

// GET Leaderboard (FR-3.11-03)
router.get('/leaderboard', (req: Request, res: Response) => {
  const topUsers = Array.from(db.users.values())
    .map(u => ({
      uid: u.uid,
      name: u.name,
      points: u.points,
      badge: u.badge
    }))
    .sort((a, b) => b.points - a.points)
    .slice(0, 10);

  res.json({ success: true, data: topUsers });
});

export default router;
