package ee.mihkel.veebipood.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Date;

@ControllerAdvice // läheb automaatikaga üle kõikide Controllerite ja Handle-b veateateid
public class ExceptionCatcher {
    // TODO: Selgita ResponseEntity

    @ExceptionHandler
    public ResponseEntity<ErrorMessage> handleException(RuntimeException e) {
        ErrorMessage error = new ErrorMessage();
        error.setMessage(e.getMessage());
        error.setTimestamp(new Date()); // import
        error.setStatus(400);
        return ResponseEntity.badRequest().body(error);
    }
}
