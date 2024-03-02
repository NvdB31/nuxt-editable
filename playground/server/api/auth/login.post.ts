import { Argon2id } from "oslo/password";
import { lucia } from "../../plugins/db";
import models from "../../models"


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

    const User = models.users;
    const existingUser = await User.findOne({ email });
	if (!existingUser) {
		throw createError({
			message: "Incorrect email or password",
			statusCode: 400
		});
	}
    
	const validPassword = await new Argon2id().verify(existingUser.password, password);
	if (!validPassword) {
		throw createError({
			message: "Incorrect email or password",
			statusCode: 400
		});
	}

	const session = await lucia.createSession(existingUser.id, {});
	appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());
});