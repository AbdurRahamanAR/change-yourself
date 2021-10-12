import moment from 'moment';
import {getLastFrequencyDate} from './HabitProvider';

test('getLastFrequencyDate give correct date', () => {
  expect(getLastFrequencyDate([0, 1, 2, 3, 4, 5, 6]).format('DD-MM-YYYY')).toBe(
    moment().subtract(1, 'day').format('DD-MM-YYYY'),
  );
});
