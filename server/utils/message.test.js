const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    const from = 'Hardik';
    const text = 'Hey, all good?';
    const message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toEqual(
      expect.objectContaining({
        from,
        text,
      })
    );
  });
});

describe('generateLocationMessage', () => {
  it('should generate the correct location object', () => {
    const from = 'Hardik';
    const latitude = 15;
    const longitude = 19;
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const message = generateLocationMessage(from, latitude, longitude);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toEqual(
      expect.objectContaining({
        from,
        url,
      })
    );
  });
});
