using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ReportingPortalApi.Models
{
    public class CategoryMetadata
    {
        [JsonIgnore]
        public ICollection<ReportingLink> ReportingLinks { get; set; }
    }
}