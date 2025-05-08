package ee.mihkel.veebipood.exception;

import lombok.Data;

import java.util.Date;

@Data // --> tema sees on @Getter, @Setter, @NoArgsConstructor
public class ErrorMessage {
    private String message; // klass --> null
    private Date timestamp; // klass --> null
    private int status; // int --> 0  double 0.0
} // boolean --> false
