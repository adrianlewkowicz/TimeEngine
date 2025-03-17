using System.Text.Json.Serialization;


/// <summary>
/// Model odpowiedzi z GitHub API dla informacji o branchu
/// </summary>
public class GitHubBranchInfo
    {
        [JsonPropertyName("commit")]
        public GitHubCommit? Commit { get; set; }
    }