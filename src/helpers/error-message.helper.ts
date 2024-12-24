export default class ErrorMessage {
    static invalidSlug: string = 'Slug cannot contain spaces, special characters, or uppercase letters.';
    static invalidPhone: string = 'The phone number cannot contain spaces, letters, and must consist of 10 digits.';
    static invalidEmail: string =
        "Email address cannot contain spaces, special characters (except for '@' and '.'), or uppercase letters in the local part (before the '@'). The domain name must contain only lowercase letters, numbers, and dots ('.').";
}
