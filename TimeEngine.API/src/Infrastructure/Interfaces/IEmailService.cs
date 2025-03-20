namespace TimeEngine.Core.Interfaces
{
    public interface IEmailService
    {
        System.Threading.Tasks.Task SendEmailAsync(string to, string subject, string body);
    }
}
