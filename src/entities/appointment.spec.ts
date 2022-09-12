import { expect, test } from 'vitest';
import { getFutureDate } from '../tests/utils/get-future-date';
import { Appointment } from './appointment';

test('create and appointment', () => {
  const startsAt = getFutureDate('2022-09-12');
  const endsAt = getFutureDate('2022-09-13');

  const appointment = new Appointment({
    customer: 'Jhon Doe',
    startsAt,
    endsAt,
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual('Jhon Doe');
});

test('cannot create an appointment with end date before start date', () => {
  const startsAt = getFutureDate('2022-09-12');
  const endsAt = getFutureDate('2022-09-11');

  expect(() => {
    return new Appointment({
      customer: 'Jhon Doe',
      startsAt,
      endsAt,
    });
  }).toThrow();
});

test('cannot create an appointment with start date before now', () => {
  const startsAt = new Date();
  const endsAt = new Date();

  startsAt.setDate(startsAt.getDate() - 1);
  endsAt.setDate(endsAt.getDate() - 1);

  expect(() => {
    return new Appointment({
      customer: 'Jhon Doe',
      startsAt,
      endsAt,
    });
  }).toThrow();
});
