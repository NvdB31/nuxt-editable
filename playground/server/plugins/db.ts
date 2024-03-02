import mongoose from "mongoose";

export default defineNitroPlugin(async () => {
	const config = useRuntimeConfig();
	await mongoose.connect(config.mongodb.uri);
})
