package com.learningPlatform.LearningPlatform.Services;
import com.learningPlatform.LearningPlatform.Entity.MainPageContend;
import com.learningPlatform.LearningPlatform.Repository.PageContendRepo;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PageContendServices {

    private final PageContendRepo pageContendRepo;

    public PageContendServices(PageContendRepo pageContendRepo) {
        this.pageContendRepo = pageContendRepo;
    }

    // GET all data
    public List<MainPageContend> getAllData() {
        return pageContendRepo.findAll();
    }

    // SAVE data
    public MainPageContend saveData(MainPageContend data) {
        data.setId(1L);
        return pageContendRepo.save(data);
    }

}
