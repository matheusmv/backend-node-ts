import { Appointment } from '../entities/appointment';

interface CreateAppointmentResquest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
  async execute({
    customer,
    startsAt,
    endsAt,
  }: CreateAppointmentResquest): Promise<CreateAppointmentResponse> {
    const appointment = new Appointment({ customer, startsAt, endsAt });

    return appointment;
  }
}
