import AvatarUrl, { InvalidAvatarUrlError } from './avatar-url';

describe('AvatarUrl', () => {
    it('should create a valid AvatarUrl with a correct URL format', () => {
        const avatarUrl = new AvatarUrl('https://example.com/avatar.png');
        expect(avatarUrl.getValue()).toBe('https://example.com/avatar.png');
    });

    it('should throw InvalidAvatarUrlError if the URL format is invalid', () => {
        expect(() => new AvatarUrl('invalid-url')).toThrow(InvalidAvatarUrlError);
        expect(() => new AvatarUrl('ftp://example.com/avatar.png')).toThrow(InvalidAvatarUrlError);
    });
});
