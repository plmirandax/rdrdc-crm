import * as z from "zod";
import { Statuses, UserRole } from "@prisma/client";


export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum([UserRole.Administrator, UserRole.User, UserRole.Manager, UserRole.Supervisor, UserRole.Viewer]),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
})
  .refine((data) => {
    if (data.password && !data.newPassword) {
      return false;
    }

    return true;
  }, {
    message: "New password is required!",
    path: ["newPassword"]
  })
  .refine((data) => {
    if (data.newPassword && !data.password) {
      return false;
    }

    return true;
  }, {
    message: "Password is required!",
    path: ["password"]
  })

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterUserSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  firstName: z.string().min(1, {
    message: "First Name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last Name is required",
  }),
  address: z.string().optional(),
  contactNo: z.string().optional(),
  role: z.enum([UserRole.Administrator, UserRole.User, UserRole.Manager, UserRole.Supervisor, UserRole.Viewer]).optional(),
});

export const CreateLeaveTypeSchema = z.object({
  name: z.string().min(1, {
    message: "Leave Type is required",
  }),
  description: z.string().optional(),
});

export const CreatePropertySchema = z.object({
  propertyCode: z.string().min(1, {
    message: "Property Code is requried."
  }),
  propertyName: z.string().min(1, {
    message: "Property Name is required. "
  }),
  titleNo: z.string().min(1, {
    message: "Title No. is required."
  }),
  lotNo: z.string().min(1, {
    message: "Lot No. is required."
  }),
  address: z.string().min(1, {
    message: "Property Address is required."
  }),
  city: z.string().min(1, {
    message: "City is required."
  }),
  province: z.string().min(1, {
    message: "Province is required."
  }),
  zipCode: z.string().min(1, {
    message: "Zip Code is required"
  }),
  propertyImage: z.string().optional(),
  createdBy: z.string()
})

export const CreateLeaveSchema = z.object({
  startDate: z.string().min(1, {
    message: "Start Date is required"
  }),
  endDate: z.string().min(1, {
    message: "End Date is required"
  }),
  reason: z.string().min(1, {
    message: "Reason is required"
  }),
  leaveType: z.string().min(1, {
    message: "Leave Type is required"
  }),
  approverId: z.string(),
  userId: z.string(),
  numberOfDays: z.string().optional(),
  leaveBalance: z.string().optional(),
})
