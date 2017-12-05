import { Course } from './';

export class CourseItem implements Course {
  private _addedDate: Date;

  constructor(private _id: number,
              private _title: string,
              addedDate: string,
              private _duration: number,
              private _description: string) {
    this._addedDate = new Date(addedDate);
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
