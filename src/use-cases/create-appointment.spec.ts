import { describe, expect, it } from 'vitest';
import { Appointment } from '../entities/appointment';
import { CreateAppointment } from './create-appointment';

describe('Create Appointment', () => {
  it('should be able to create an appointment', () => {
    const sut = new CreateAppointment();

    expect.assertions(1);

    const startsAt = new Date();
    const endsAt = new Date();

    startsAt.setDate(startsAt.getDate() + 1);
    endsAt.setDate(endsAt.getDate() + 2);

    expect(
      sut.execute({
        customer: 'Jhon Doe',
        startsAt,
        endsAt,
      }),
    ).resolves.toBeInstanceOf(Appointment);
  });
});
