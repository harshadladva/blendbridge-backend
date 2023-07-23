import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { YesNoMaybe } from '../entity/user.entity';

export type UserDocument = Users & Document;

@Schema({ timestamps: true })
export class Users {
  static readonly schemaName = 'users';

  @Prop({ type: String, unique: true })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: Boolean, default: true })
  status: boolean;

  @Prop({ type: String, required: false })
  profileImage: string;

  @Prop({ type: String })
  mobileNumber: string;

  @Prop({ type: String })
  resume: string;

  @Prop({ type: String })
  currentCompany: string;

  @Prop({ type: String })
  currentJobProfile: string;

  @Prop({ type: String })
  dreamCompany: string;

  @Prop({ type: String, default: YesNoMaybe.YES })
  feelCourseForAchivingDreamJobIsCorrect: YesNoMaybe;

  @Prop({ type: String })
  whatYoubelieveNotInyourFavour: string;

  @Prop({ type: Number, default: 5, min: 1, max: 5 })
  appRating: number;
}

export const UserSchema = SchemaFactory.createForClass(Users);

UserSchema.index({ '$**': 'text' }, { name: 'userTextIndex' });
