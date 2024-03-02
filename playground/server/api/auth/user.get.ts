export default defineEventHandler((event) => {
	console.log('userrrr', event.context.user)
	return event.context.user;
});