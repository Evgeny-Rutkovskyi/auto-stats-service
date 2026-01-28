export async function errorMiddleware(ctx, next) {
  try {
    await next();
  } catch (err) {
    console.error(err);
    ctx.status = err.status || 500;
    ctx.body = { error: "Internal Server Error" };
  }
}
