using System;

namespace API.Extensions;

public static class DateTimeExtensions
{
    public static int CalculateAge(this DateOnly dateOfBirth)
    {
        var today = DateOnly.FromDateTime(DateTime.Now);

        var age = today.Year - dateOfBirth.Year;

        if (dateOfBirth.AddYears(age) > today)
        {
            age--;
        }

        return age;
    }
}
