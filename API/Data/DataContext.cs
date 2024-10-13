using System;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<AppUser> Users { get; set; }
    public DbSet<UserLike> Likes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<UserLike>()
            .HasKey(key => new { key.SourceUserId, key.TargetUserId });

        modelBuilder.Entity<UserLike>()
            .HasOne(userLike => userLike.SourceUser)
            .WithMany(user => user.LikedUsers)
            .HasForeignKey(userLike => userLike.SourceUserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<UserLike>()
            .HasOne(userLike => userLike.TargetUser)
            .WithMany(user => user.LikedByUsers)
            .HasForeignKey(userLike => userLike.TargetUserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
