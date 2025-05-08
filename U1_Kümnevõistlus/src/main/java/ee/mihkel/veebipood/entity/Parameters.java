package ee.mihkel.veebipood.entity;


public class Parameters {

    public float A;
    public float B;
    public float C;
    public DataType dataType;

    Parameters(float A, float B, float C, DataType dataType) {
        this.A = A;
        this.B = B;
        this.C = C;
        this.dataType = dataType;
    }
}
