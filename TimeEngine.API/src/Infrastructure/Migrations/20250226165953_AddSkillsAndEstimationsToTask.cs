using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeEngine.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddSkillsAndEstimationsToTask : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "EstimationJunior",
                table: "Tasks",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EstimationMid",
                table: "Tasks",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EstimationSenior",
                table: "Tasks",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "Skills",
                table: "Tasks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EstimationJunior",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "EstimationMid",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "EstimationSenior",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "Skills",
                table: "Tasks");
        }
    }
}
