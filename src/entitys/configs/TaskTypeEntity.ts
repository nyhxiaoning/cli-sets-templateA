/** 任务类型实体类 */
export class TaskTypeEntity {
  constructor() {
    this.name = '';
    this.group = '';
    this.color = '';
  }
  name: string;
  id?: string;
  group: string;
  color: string;
  description: string | undefined;
}
