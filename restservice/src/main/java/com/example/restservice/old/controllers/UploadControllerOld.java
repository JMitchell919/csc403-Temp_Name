// Marked for deletion

// import org.springframework.web.bind.annotation.*;
// import org.springframework.web.multipart.MultipartFile;

// import java.io.File;
// import java.io.IOException;
// import java.nio.file.Paths;

// @RestController
// @RequestMapping("/upload")
// public class UploadController {

//     SqlService sqlService = SqlService.getInstance();

//     private static final String UPLOAD_DIR = Paths.get("src/main/resources/static/images").toAbsolutePath().toString();

//     @PostMapping("/image")
//     public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
//         if (file.isEmpty()) {
//             return ResponseEntity.badRequest().body("File is empty");
//         }

//         String fileName = file.getOriginalFilename();
//         File destinationFile = new File(UPLOAD_DIR, fileName);

//         try {
//             file.transferTo(destinationFile);
            
//             System.out.println(UPLOAD_DIR + "/" + fileName);
//             sqlService.write("INSERT INTO post_pics (post_id, pic_url) VALUES (?, ?)", postId, UPLOAD_DIR + "/" + fileName);

//             return ResponseEntity.ok("File uploaded successfully: " + fileName);
//         } catch (IOException e) {
//             e.printStackTrace();
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed");
//         }
//     }

//     private void saveImageReference(String fileName) {
//         // Implement logic to save fileName to your post_pics table
//     }
// }
