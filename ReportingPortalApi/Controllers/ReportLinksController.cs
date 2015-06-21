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
    public class ReportLinksController : ApiController
    {
        private NeriumDWEntities db = new NeriumDWEntities();

        // GET api/ReportLinks
        public IEnumerable<ReportingLink> GetReportingLinks()
        {
            return db.ReportingLinks.AsEnumerable();
        }

        // GET api/ReportLinks/5
        public ReportingLink GetReportingLink(int id)
        {
            ReportingLink reportinglink = db.ReportingLinks.Find(id);
            if (reportinglink == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return reportinglink;
        }

        // PUT api/ReportLinks/5
        public HttpResponseMessage PutReportingLink(int id, ReportingLink reportinglink)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != reportinglink.Id)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(reportinglink).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // POST api/ReportLinks
        public HttpResponseMessage PostReportingLink(ReportingLink reportinglink)
        {
            if (ModelState.IsValid)
            {
                db.ReportingLinks.Add(reportinglink);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, reportinglink);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = reportinglink.Id }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/ReportLinks/5
        public HttpResponseMessage DeleteReportingLink(int id)
        {
            ReportingLink reportinglink = db.ReportingLinks.Find(id);
            if (reportinglink == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.ReportingLinks.Remove(reportinglink);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, reportinglink);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}