import { Course } from './course.model';

export class CourseItem implements Course {
  private _id: number;
  private _title: string;
  private _addedDate: Date;
  private _duration: number;
  private _description: string;

  constructor(course: Course) {
    ({
      id: this._id,
      title: this._title,
      addedDate: this._addedDate,
      duration: this._duration,
      description: this._description
    } = course);
  }

  get addedDate(): Date {
    return this._addedDate;
  }

  set addedDate(value: Date) {
    this._addedDate = value;
  }

  public get id(): number {
    return this._id;
  }

  public set id(value: number) {
    this._id = value;
  }

  public get title(): string {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
  }

  public get duration(): number {
    return this._duration;
  }

  public set duration(value: number) {
    this._duration = value;
  }

  public get description(): string {
    return this._description;
  }

  public set description(value: string) {
    this._description = value;
  }
}
