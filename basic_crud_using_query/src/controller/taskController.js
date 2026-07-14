const service = require("../service/taskService");

exports.getAllTask = async (req, res, next) => {
  try {
    // const { page,limit,status } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const status = req.query.status || "";
    const task = await service.getAllTask({ page, limit, status });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

exports.getSingleTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const singleTask = await service.getSingleTask(id);
    res.json(singleTask);
  } catch (err) {
    next(err);
  }
};
