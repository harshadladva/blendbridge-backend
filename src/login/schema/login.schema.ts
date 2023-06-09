import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Users & Document;

@Schema()
export class Users {
  static readonly schemaName = 'users';

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: String })
  status: string;

  @Prop({ type: String })
  tokenHash: string;

  @Prop({ type: String, required: false })
  profileImage: string;

  @Prop({ type: String })
  contact: string;
}

export const UserSchema = SchemaFactory.createForClass(Users);

UserSchema.index({ '$**': 'text' }, { name: 'userTextIndex' });
