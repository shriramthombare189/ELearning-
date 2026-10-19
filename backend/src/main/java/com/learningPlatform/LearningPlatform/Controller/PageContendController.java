package com.learningPlatform.LearningPlatform.Controller;

import com.learningPlatform.LearningPlatform.Entity.MainPageContend;
import com.learningPlatform.LearningPlatform.Services.PageContendServices;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/main-page")
@CrossOrigin("http://localhost:3000")
public class PageContendController {

    private final PageContendServices pageContendServices;

    public PageContendController(PageContendServices pageContendServices) {
        this.pageContendServices = pageContendServices;
    }

    // GET : fetch homepage data
    @GetMapping
    public List<MainPageContend> getAll() {
        return pageContendServices.getAllData();
    }

    // POST : add homepage data
    @PostMapping
    public MainPageContend addData(@RequestBody MainPageContend data) {

        return pageContendServices.saveData(data);
    }

}
