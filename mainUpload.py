import tornado.web
import tornado.ioloop
import asyncio
import visionex as vision
import upload

class uploadHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html")
    
    def post(self):
        files = self.request.files["imgFile"]
        for f in files:
            fh = open(f"img/{f.filename}", "wb")
            fh.write(f.body)
            fh.close()
            upload.upload_blob("gs://visionbucketlood/", f"upload/{f.filename}", destination_blob_name = "muestra")
            

    



if (__name__ == "__main__"):
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    app = tornado.web.Application([
        ("/", uploadHandler),
        ("/img/(.*)", tornado.web.StaticFileHandler, {"path": "img"})
    ])
    app.listen(8000)
    print("Listening at port 8000")
    tornado.ioloop.IOLoop.instance().start()

