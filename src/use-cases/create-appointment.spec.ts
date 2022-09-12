import { describe, expect, it } from 'vitest';
import { Appointment } from '../entities/appointment';
import { InMemoryAppointmentsRepository } from '../repositories/in-memory/in-memory-appointments-repository';
import { getFutureDate } from '../tests/utils/get-future-date';
import { CreateAppointment } from './create-appointment';

describe('Create Appointment', () => {
  it('should be able to create an appointment', () => {
    const sut = new CreateAppointment(new InMemoryAppointmentsRepository());

    expect.assertions(1);

    const startsAt = getFutureDate('2022-09-12');
    const endsAt = getFutureDate('2022-09-13');

    expect(
      sut.execute({
        customer: 'Jhon Doe',
        startsAt,
        endsAt,
      }),
    ).resolves.toBeInstanceOf(Appointment);
  });

  it('should not be able to create an appointment with overlapping dates', async () => {
    const sut = new CreateAppointment(new InMemoryAppointmentsRepository());

    expect.assertions(4);

    const startsAt = getFutureDate('2022-09-12');
    const endsAt = getFutureDate('2022-09-16');

    await sut.execute({
      customer: 'Jhon Doe',
      startsAt,
      endsAt,
    });

    expect(
      sut.execute({
        customer: 'Alex Jhones',
        startsAt: getFutureDate('2022-09-14'),
        endsAt: getFutureDate('2022-09-18'),
      }),
    ).rejects.toBeInstanceOf(Error);

    expect(
      sut.execute({
        customer: 'Alex Jhones',
        startsAt: getFutureDate('2022-09-11'),
        endsAt: getFutureDate('2022-09-13'),
      }),
    ).rejects.toBeInstanceOf(Error);

    expect(
      sut.execute({
        customer: 'Alex Jhones',
        startsAt: getFutureDate('2022-09-11'),
        endsAt: getFutureDate('2022-09-18'),
      }),
    ).rejects.toBeInstanceOf(Error);

    expect(
      sut.execute({
        customer: 'Alex Jhones',
        startsAt: getFutureDate('2022-09-13'),
        endsAt: getFutureDate('2022-09-14'),
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
