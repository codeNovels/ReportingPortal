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
    public class LinkCategoryController : ApiController
    {
        private NeriumDWEntities2 db = new NeriumDWEntities2();

        // GET api/LinkCategory
        public IEnumerable<LinkCategory> GetLinkCategories()
        {
            return db.LinkCategories.AsEnumerable();
        }

        // GET api/LinkCategory/5
        public LinkCategory GetLinkCategory(int id)
        {
            LinkCategory linkcategory = db.LinkCategories.Find(id);
            if (linkcategory == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return linkcategory;
        }

        // PUT api/LinkCategory/5
        public HttpResponseMessage PutLinkCategory(int id, LinkCategory linkcategory)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != linkcategory.LinkId)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(linkcategory).State = EntityState.Modified;

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

        // POST api/LinkCategory
        public HttpResponseMessage PostLinkCategory(LinkCategory linkcategory)
        {
            if (ModelState.IsValid)
            {
                db.LinkCategories.Add(linkcategory);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, linkcategory);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = linkcategory.LinkId }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/LinkCategory/5
        public HttpResponseMessage DeleteLinkCategory(int id)
        {
            LinkCategory linkcategory = db.LinkCategories.Find(id);
            if (linkcategory == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.LinkCategories.Remove(linkcategory);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, linkcategory);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}