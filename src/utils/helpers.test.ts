import {formatDate} from './helpers';

test('format date returns correct date string', () => {
    const timestamp = 946720800;
    const dateString = formatDate(timestamp)
    expect(dateString).toBe("01/01/2000, 9:00 pm");
});
