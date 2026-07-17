using Apex_Deriv_Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Apex_Deriv_Server.DataContext
{
    public class ApexContext(DbContextOptions<ApexContext> options) : DbContext(options)
    {
        public DbSet<UserModel> Users { get; set; } = null!;
        public DbSet<Portfolio> Portfolios { get; set; } = null!;
        public DbSet<Asset> Assets { get; set; } = null!;
        public DbSet<Derivative> Derivatives { get; set; } = null!;
        public DbSet<Trade> Trades { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserModel>()
                .HasMany(u => u.Portfolios)
                .WithOne(p => p.User)
                .HasForeignKey(p => p.UserId);

            modelBuilder.Entity<Portfolio>()
                .HasMany(p => p.Trades)
                .WithOne(t => t.Portfolio)
                .HasForeignKey(t => t.PortfolioId);

            modelBuilder.Entity<Asset>()
                .HasMany(a => a.Derivatives)
                .WithOne(d => d.Asset)
                .HasForeignKey(d => d.AssetId);

            modelBuilder.Entity<Derivative>()
                .HasMany(d => d.Trades)
                .WithOne(t => t.Derivative)
                .HasForeignKey(t => t.DerivativeId);

            modelBuilder.Entity<Trade>()
                .Property(t => t.Status)
                .HasDefaultValue("Open");

            modelBuilder.Entity<Trade>()
                .Property(t => t.Quantity)
                .HasPrecision(18, 4);

            modelBuilder.Entity<Trade>()
                .Property(t => t.PurchasePrice)
                .HasPrecision(18, 4);

            modelBuilder.Entity<Trade>()
                .Property(t => t.CurrentPrice)
                .HasPrecision(18, 4);

            modelBuilder.Entity<Asset>()
                .Property(a => a.CurrentPrice)
                .HasPrecision(18, 4);

            modelBuilder.Entity<Derivative>()
                .Property(d => d.CurrentPrice)
                .HasPrecision(18, 4);

            modelBuilder.Entity<Portfolio>()
                .Property(p => p.TotalValue)
                .HasPrecision(18, 4); // 18 total digits, 4 after the decimal point

        }
    }
}