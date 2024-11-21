using System;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext(DbContextOptions options) : IdentityDbContext
    <
    AppUser, AppRole, int,
    IdentityUserClaim<int>,
    AppUserRole,
    IdentityUserLogin<int>,
    IdentityRoleClaim<int>,
    IdentityUserToken<int>
    >(options)
{
    public DbSet<AppUser> Users { get; set; }
    public DbSet<UserLike> Likes { get; set; }
    public DbSet<Message> Messages { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<AppUser>()
            .HasMany(user => user.UserRoles)
            .WithOne(user => user.User)
            .HasForeignKey(user => user.UserId)
            .IsRequired();

        modelBuilder.Entity<AppRole>()
            .HasMany(user => user.UserRoles)
            .WithOne(user => user.Role)
            .HasForeignKey(user => user.RoleId)
            .IsRequired();

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

        modelBuilder.Entity<Message>()
            .HasOne(message => message.Recipient)
            .WithMany(user => user.MessagesReceived)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Message>()
            .HasOne(message => message.Sender)
            .WithMany(user => user.MessagesSent)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
