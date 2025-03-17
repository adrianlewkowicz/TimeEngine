using System.Text.Json.Serialization;

public class GitHubBranchResponse
{
  [JsonPropertyName("url")]
  public string BranchUrl { get; set; } = string.Empty;

}
