export default class ModelTask {
  constructor(data) {
    this.id = data[`id`];
    this.description = data[`description`] || ``;
    this.dueDate = new Date(data[`due_date`]);
    this.tags = new Set(data[`tags`] || []);
    this.repeatingDays = data[`repeating_days`];
    this.color = data[`color`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.isArchive = Boolean(data[`is_archive`]);
  }

  static parseTask(data) {
    return new ModelTask(data);
  }

  static parseTasks(data) {
    return data.map(ModelTask.parseTask);
  }

}

