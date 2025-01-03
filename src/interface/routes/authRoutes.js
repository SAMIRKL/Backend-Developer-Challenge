const express = require("express");
const AuthController = require("../controllers/AuthController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication management API
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: P@ssw0rd123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: P@ssw0rd123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5...
 *       400:
 *         description: Invalid input data or missing fields
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out the currently logged-in user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized or no active session
 *       500:
 *         description: Server error
 */

// POST /register - Register a new user
router.post("/register", AuthController.register);

// POST /login - Log in an existing user
router.post("/login", AuthController.login);

// POST /logout - Log out the currently logged-in user
router.post("/logout", AuthController.logout);

module.exports = router;