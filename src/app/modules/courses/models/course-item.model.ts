import { Course } from './course.model';

export class CourseItem implements Course {
  private _id: number;
  private _name: string;
  private _addedDate: Date;
  private _duration: number;
  private _description: string;
  private _isTopRated: boolean;

  constructor(course: Course) {
    ({
      id: this._id,
      name: this._name,
      addedDate: this._addedDate,
      duration: this._duration,
      description: this._description,
      isTopRated: this._isTopRated
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

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
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

  public get isTopRated(): boolean {
    return this._isTopRated;
  }

  public set isTopRated(value: boolean) {
    this._isTopRated = value;
  }
}
