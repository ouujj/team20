package team20.se61.sut.wongnai.DataLoader;
import team20.se61.sut.wongnai.Entity.*;
import team20.se61.sut.wongnai.Repository.*;
import java.util.stream.Stream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
@Component
public class ReportProblemDataloader implements ApplicationRunner {

    @Autowired  private  TagRepository tagRepository;
    @Autowired  private RoomRepository roomRepository;
    @Autowired  private ReportProblemRepository reportProblemRepository;
    //@Autowired  private ReportTagRepository reportTagRepository;
    
    @Override
    public void run(ApplicationArguments args) throws Exception {

        
        Stream.of("bug","text ผิด","ปุ่มกดไม่ได้","ค้าง","จอเด้ง").forEach(tagName -> { 
            tagRepository.save(new Tag(tagName));            
        });

        Stream.of("รีวิวร้านอาหาร","เพิ่มร้านค้า","สมัครเป็นร้านค้า","เพิ่มสูตรอาหาร").forEach(roomName -> { 
            roomRepository.save(new Room(roomName));
        });
        
        tagRepository.findAll().forEach(System.out::println);
        roomRepository.findAll().forEach(System.out::println);
        reportProblemRepository.findAll().forEach(System.out::println);
	}
    
}