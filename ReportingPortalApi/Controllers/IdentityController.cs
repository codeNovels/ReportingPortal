using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using ReportingPortalApi.Models;

namespace ReportingPortalApi.Controllers
{
    public class IdentityController : ApiController
    {


        // GET api/Identity
        public string Get()
        {
            var user = HttpContext.Current.User.Identity.Name.Replace("HQ\\", "").ToLower();
            return user;

        }

    }
}

