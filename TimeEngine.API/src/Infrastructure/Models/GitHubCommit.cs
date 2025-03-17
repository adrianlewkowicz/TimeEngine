using System.Text.Json.Serialization;

public class GitHubCommit
    {
        [JsonPropertyName("sha")]
        public string? Sha { get; set; }
    }