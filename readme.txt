ROUTES

BASE URL
localhost:7001/user


GET ALL FILES NAME BY ADDRESS
POST
Send address in body
/files-by-address

UPLOAD FILE
POST
/upload-file
Send file with file name property -> my-file
SEND ADDRESS in body


DOWNLOAD FILE
POST
/download-file
SEND ADDRESS in body
SEND FILE_NAME in body


GET HASH OF FILE
POST
/get-hash
e.g in body
{
	"address" : "0xC0eB7c1828d6818697dd1D1589d1A5F714FF84EF",
	"file_name" : "Ansur Mehdi , team undefined.png-d04d431cf9801af959180dc91726eca83dd8eb881f9f3e90acf13738e4463f9e"
}

