import { Argon2id } from "oslo/password";
import { generateId } from "lucia";
import models from "../../models"
import { lucia } from "../../plugins/db";

export default eventHandler(async (event) => {
	const formData = await readBody(event);
	const email = formData.email
	if (
		typeof email !== "string" ||
		email.length < 3 ||
!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
	) {
		throw createError({
			message: "Invalid email",
			statusCode: 400
		});
	}
	const password = formData.password
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
		throw createError({
			message: "Invalid password",
			statusCode: 400
		});
	}

	const hashedPassword = await new Argon2id().hash(password);
	const userId = generateId(15);

    // TODO: check if email is already used
    try {
        const User = models.users;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return createError({
                message: "Email already in use",
                statusCode: 400
            });
        }

        const newUser = new User({
            email: email,
            password: hashedPassword
        });
        await newUser.save();
        const session = await lucia.createSession(userId, {});
        appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());
        return 'OK';
    } catch (e) {
        console.log(e)
        throw createError({
			message: "An unknown error occurred while signing up",
			statusCode: 500
		});
    }	
});