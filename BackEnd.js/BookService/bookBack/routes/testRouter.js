const express = require('express')
const router = express.Router();
const multer = require('multer'); //파일 업로드 처리

//업로드 파일을 저장할 정보를 갖는 storage객체 할당
const storage = multer.diskStorage({
    destination:function(req, file, callback){//업로드할 디렉토리를 설정
        callback(null, 'public/upload/' ) //업로드할 디렉토리 넣을건데 첫번째 인수가 에러임, 두번째가 디렉토리 정보임. /public/upload폴더에 업로드할거임
    }, 
    filename: function (req, file, callback){//두번째 옵션으로는 파일 네임이 들어간다.
        callback(null, Date.now()+'_'+file.originalname); //업로드할 파일명 설정
    }
})

const upmulter = multer({storage})
router.use('/upload', express.static('upload'))

router.post('/fileUp', upmulter.single("myfile"), (req,res)=>{

    //업로드한 파일 정보를 추출하여 브라우저에 출력해보자
    const fname = req.file; //첨부 파일명
    const name = req.body.name; //올린 사람

    // res.send(`파일 업로드로 잘 들어옴<br><h2>첨부파일: ${fname}</h2><h2>올린이:${name}</h2>`); //백틱으로 넣어야 <br>이 먹나봄
    res.json({filename:req.file, name: name});
})

module.exports = router;