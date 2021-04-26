const { ctx, app } = this
const result = app.model.User.findAll({
  include: [{ model: app.model.User }],
})
ctx.body = result
