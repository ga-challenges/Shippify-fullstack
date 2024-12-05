export default abstract class DomainError extends Error {
    readonly context = 'DOMAIN';
}
