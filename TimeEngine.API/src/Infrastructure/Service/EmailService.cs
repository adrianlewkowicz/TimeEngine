using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using TimeEngine.Core.Interfaces;

namespace TimeEngine.Infrastructure.Services
{
    public class EmailService : IEmailService
    {
        private readonly string _smtpHost = "smtp.gmail.com";
        private readonly int _smtpPort = 587;
        private readonly string _smtpUser = "your-email@gmail.com";
        private readonly string _smtpPass = "your-password";

        public async System.Threading.Tasks.Task SendEmailAsync(string to, string subject, string body)
        {
            try
            {
                using var smtpClient = new SmtpClient(_smtpHost, _smtpPort)
                {
                    Credentials = new NetworkCredential(_smtpUser, _smtpPass),
                    EnableSsl = true
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(_smtpUser),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true
                };

                mailMessage.To.Add(to);
                await smtpClient.SendMailAsync(mailMessage);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Błąd wysyłania e-maila: {ex.Message}");
            }
             
        }
    }
}
