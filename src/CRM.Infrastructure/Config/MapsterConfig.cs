using System.Reflection;
using Mapster;

namespace CRM.Infrastructure.Config;

public static class MapsterConfig
{
    public static void AddMapster()
    {
        TypeAdapterConfig.GlobalSettings.Scan(Assembly.GetExecutingAssembly());
    }

}
